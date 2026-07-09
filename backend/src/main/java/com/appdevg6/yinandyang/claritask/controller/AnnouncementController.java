package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.AnnouncementDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Announcement;
import com.appdevg6.yinandyang.claritask.entity.Task;
import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import com.appdevg6.yinandyang.claritask.repository.TaskRepository;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import com.appdevg6.yinandyang.claritask.util.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.appdevg6.yinandyang.claritask.service.TaskDeadlineAnnouncementService;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
    private final AnnouncementRepository repo;
    private final UserRepository users;
    private final TaskRepository tasks;
    private final TaskDeadlineAnnouncementService deadlineService;

    public AnnouncementController(AnnouncementRepository repo, UserRepository users, TaskRepository tasks, TaskDeadlineAnnouncementService deadlineService) {
        this.repo = repo;
        this.users = users;
        this.tasks = tasks;
        this.deadlineService = deadlineService;
    }

    @GetMapping
    public List<AnnouncementDto> all() {
        // Run the deadline service to generate any new reminders in real-time
        try {
            deadlineService.postDeadlineAnnouncements();
        } catch (Exception e) {
            System.err.println("Failed to run deadline service: " + e.getMessage());
        }

        Long userId = SecurityUtil.getCurrentUserId();
        LocalDateTime now = LocalDateTime.now();

        return repo.findAllByOrderByCreatedAtDesc().stream()
                .filter(ann -> ann.getUser() != null && ann.getUser().getUserId().equals(userId))
                .filter(ann -> ann.getExpiresAt() == null || ann.getExpiresAt().isAfter(now))
                .filter(ann -> {
                    String type = ann.getNotificationType();
                    return "task_overdue".equals(type) ||
                           "task_due_week".equals(type) ||
                           "task_due_day".equals(type) ||
                           "task_due_24h_window".equals(type) ||
                           "task_due_soon".equals(type);
                })
                .filter(ann -> ann.getTask() == null || !"completed".equalsIgnoreCase(ann.getTask().getStatus()))
                .map(DtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<AnnouncementDto> create(
            @RequestParam(required = false) Long taskId,
            @RequestBody AnnouncementDto announcementDto
    ) {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = users.findById(userId).orElseThrow();
        
        // Remove role restriction - both students and teachers can create announcements
        Announcement a = new Announcement();
        a.setTitle(announcementDto.getTitle());
        a.setContent(announcementDto.getContent());
        a.setUser(user);
        a.setNotificationType("manual");
        
        if (taskId != null) {
            Optional<Task> tOpt = tasks.findById(taskId);
            tOpt.ifPresent(a::setTask);
            if (tOpt.isPresent() && (a.getTitle() == null || a.getTitle().isBlank())) {
                a.setTitle("Update for: " + tOpt.get().getTitle());
            }
        }
        
        Announcement saved = repo.save(a);
        return ResponseEntity.ok(DtoMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementDto> update(@PathVariable Long id, @RequestBody AnnouncementDto announcementDto) {
        Long userId = SecurityUtil.getCurrentUserId();
        return repo.findById(id)
                .filter(a -> a.getUser().getUserId().equals(userId))
                .map(existing -> {
                    existing.setTitle(announcementDto.getTitle());
                    existing.setContent(announcementDto.getContent());
                    Announcement saved = repo.save(existing);
                    return ResponseEntity.ok(DtoMapper.toDto(saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        return repo.findById(id)
                .filter(a -> a.getUser().getUserId().equals(userId))
                .map(a -> {
                    repo.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
