package com.portfolio.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.backend.entity.Project;


public interface ProjectRepository extends JpaRepository<Project, Long> {
}

