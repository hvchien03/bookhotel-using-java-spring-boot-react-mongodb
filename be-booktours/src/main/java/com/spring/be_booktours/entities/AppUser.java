package com.spring.be_booktours.entities;

import java.util.Date;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "appusers")
@NoArgsConstructor
@AllArgsConstructor
public class AppUser implements UserDetails {

    @Id
    private String id;
    private String email;
    private String name;
    private String phone;
    private String password;
    private boolean verifiedEmail; // Đã xác thực email hay chưa
    private Set<String> roles; // Liên kết với Role
    private Date createdAt;
    
    // Các trường dữ liệu khác...
    // private String address;
    // private double accountBalance; // Số dư ví
    // ...

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Hàm này trả về danh sách quyền của người dùng
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Hàm này trả về true nếu tài khoản không hết hạn
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Hàm này trả về true nếu tài khoản không bị khóa
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Hàm này trả về true nếu thông tin đăng nhập không hết hạn
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Hàm này trả về true nếu tài khoản đang hoạt động
        return true;
    }

}