package com.nauHack.backend.entities.User;

import java.util.HashSet;
import java.util.Set;

import com.nauHack.backend.entities.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "organizer")
    private Set<Event> organizedEvents = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_events", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
    private Set<Event> events = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_favorite_events", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
    private Set<Event> favoriteEvents = new HashSet<>();

    @Column(nullable = false)
    private boolean active = false;

}
