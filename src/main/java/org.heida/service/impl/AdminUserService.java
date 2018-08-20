package org.heida.service.impl;

import org.heida.model.AdminUser;
import org.springframework.stereotype.Service;

@Service
public interface AdminUserService {
    AdminUser checkAdminUser(AdminUser adminUser);
}
