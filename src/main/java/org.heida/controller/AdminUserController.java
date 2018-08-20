package org.heida.controller;

import org.heida.model.AdminUser;
import org.heida.service.impl.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller()
@RequestMapping("/admin")
public class AdminUserController {
    @Autowired
    private AdminUserService adminUserService;

    @RequestMapping("/login")
    public String login(){
        return "loginOfAdmin";
    }

    @RequestMapping("/personal")
    public String personal(){
        return "personal";
    }

    @RequestMapping("/checkAdminUser")
    public String checkAdminUser(AdminUser adminUser, HttpServletRequest request){
        AdminUser adminUser1 = adminUserService.checkAdminUser(adminUser);
        if(adminUser1==null){
            return "redirect:/admin/login.do";
        }else{
            HttpSession session = request.getSession();
            session.setAttribute("adminUser",adminUser1);
            return "indexOfAdmin";
        }
    }

    @RequestMapping("/update")
    public String update(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute("adminUser");
        return "redirect:/admin/login.do";
    }
    @RequestMapping("/exit")
    public String exit(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute("adminUser");
        return "forward:/index.do";
    }
}
