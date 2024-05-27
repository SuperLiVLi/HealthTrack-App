package com.example.healthtrack.mapper;

import com.example.healthtrack.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    User findByEmail(@Param("email") String email);
    void insertUser(User user);
    Long getMaxUserId();
    boolean checkEmailContains(@Param("email") String email);
}