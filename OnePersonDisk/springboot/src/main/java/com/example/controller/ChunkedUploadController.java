package com.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class ChunkedUploadController {

    private static final String UPLOAD_DIR = "uploads/";
    private static final int CHUNK_SIZE = 1024 * 1024 * 10; // 10MB per chunk  

    @PostMapping("/init")
    public ResponseEntity<?> initUpload() {
        // 生成一个唯一的会话ID  
        String sessionId = UUID.randomUUID().toString();
        // 返回会话ID和其他配置信息给客户端  
        return ResponseEntity.ok(sessionId);
    }

    @PostMapping("/chunk")
    public ResponseEntity<?> uploadChunk(@RequestParam("sessionId") String sessionId,
                                         @RequestParam("chunkNumber") int chunkNumber,
                                         @RequestParam("file") MultipartFile file) {
        // 根据会话ID构建文件保存路径  
        Path chunkPath = Paths.get(UPLOAD_DIR, sessionId, String.format("chunk-%d", chunkNumber));
        try {
            // 保存文件分块到临时目录  
            Files.createDirectories(chunkPath.getParent());
            Files.write(chunkPath, file.getBytes());
        } catch (IOException e) {
            // 处理异常  
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to write chunk");
        }
        // 返回成功响应或其他信息  
        return ResponseEntity.ok().build();
    }

    @PostMapping("/merge")
    public ResponseEntity<?> mergeChunks(@RequestParam("sessionId") String sessionId) {
        // 根据会话ID找到所有分块并合并它们  
        Path finalFilePath = Paths.get(UPLOAD_DIR, sessionId + "-final.file");
        Path chunksDir = Paths.get(UPLOAD_DIR, sessionId);
        try {
            Files.createDirectories(finalFilePath.getParent());
            try (java.io.FileOutputStream fos = new java.io.FileOutputStream(finalFilePath.toFile())) {
                Files.list(chunksDir)
                        .filter(p -> p.toString().endsWith(".chunk"))
                        .sorted()
                        .forEach(chunkPath -> {
                            try (java.io.FileInputStream fis = new java.io.FileInputStream(chunkPath.toFile())) {
                                byte[] buffer = new byte[1024];
                                int bytesRead;
                                while ((bytesRead = fis.read(buffer)) != -1) {
                                    fos.write(buffer, 0, bytesRead);
                                }
                            } catch (IOException e) {
                                // 处理异常  
                            }
                        });
            }
            // 删除临时分块文件  
            Files.list(chunksDir)
                    .filter(p -> p.toString().endsWith(".chunk"))
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                        } catch (IOException e) {
                            // 处理异常  
                        }
                    });
            // 返回合并后的文件路径或其他信息  
            return ResponseEntity.ok(finalFilePath.toString());
        } catch (IOException e) {
            // 处理异常  
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to merge chunks");
        }
    }
}