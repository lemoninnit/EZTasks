package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.LoginRequest;
import com.appdevg6.yinandyang.claritask.dto.RegisterRequest;
import com.appdevg6.yinandyang.claritask.dto.UserDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import com.appdevg6.yinandyang.claritask.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository users, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Optional<User> uOpt = users.findByEmail(req.getEmail());
        if (uOpt.isEmpty()) return ResponseEntity.status(401).body("Invalid credentials");
        User u = uOpt.get();
        
        boolean ok = false;
        if (u.getPassword() != null && u.getPassword().startsWith("$2")) {
            ok = passwordEncoder.matches(req.getPassword(), u.getPassword());
        } else {
            ok = req.getPassword().equals(u.getPassword());
            if (ok) { 
                u.setPassword(passwordEncoder.encode(u.getPassword())); 
                users.save(u); 
            }
        }
        if (!ok) return ResponseEntity.status(401).body("Invalid credentials");
        
        String token = jwtUtil.generateToken(u.getUserId(), u.getEmail(), u.getRole());
        UserDto dto = DtoMapper.toDto(u);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", dto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (users.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setRole("user");
        User saved = users.save(u);
        
        String token = jwtUtil.generateToken(saved.getUserId(), saved.getEmail(), saved.getRole());
        UserDto dto = DtoMapper.toDto(saved);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", dto);
        return ResponseEntity.ok(response);
    }
}
