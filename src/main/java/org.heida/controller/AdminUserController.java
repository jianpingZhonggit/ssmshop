package org.heida.controller;

import org.heida.model.AdminUser;
import org.heida.service.impl.AdminUserService;
import org.heida.util.AdminLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

@Controller()
@RequestMapping("/admin")
public class AdminUserController {
    @Autowired
    private AdminUserService adminUserService;

    /**
     * 跳转至后台登录页面
     * @return
     */
    @RequestMapping("/login")
    public String login(HttpServletRequest request,Model model){
        AdminUser temp = new AdminUser();
        Cookie[] cookies = request.getCookies();
        for (int i = 0; i <cookies.length; i++) {
            if("adminUsername".equals(cookies[i].getName())){
                try {
                    temp.setUsername(URLDecoder.decode(cookies[i].getValue(),"utf-8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
            if("adminPassword".equals(cookies[i].getName())){
                try {
                    temp.setPassword(URLDecoder.decode(cookies[i].getValue(),"utf-8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
        }
        model.addAttribute("temp",temp);
        return "loginOfAdmin";
    }


    @AdminLogin
    @RequestMapping("/indexOfAdmin")
    public String indexOfAdmin(){
        return "indexOfAdmin";
    }
    /**
     * 跳转至后台个人信息页面
     * @return
     */
    @AdminLogin
    @RequestMapping("/personal")
    public String personal(){
        return "personal";
    }

    /**
     * 检查登录后台的用户是否正确
     * @param adminUser
     * @param request
     * @return
     */
    @RequestMapping("/checkAdminUser")
    public String checkAdminUser(HttpServletResponse response,String checked, AdminUser adminUser, HttpServletRequest request){
        AdminUser adminUser1 = adminUserService.checkAdminUser(adminUser);
        //登录的用户名或密码错误,请求转发至后台登录页面
        if(adminUser1==null){
            request.setAttribute("msg","用户名或密码错误!");
            return "forward:login.do";
        }else{
            //登录成功,将用户信息存在Session中,跳转至后台首页
            if("checked".equals(checked)){
                try {
                    String username = URLEncoder.encode(adminUser.getUsername(),"utf-8");
                    Cookie adminUsername = new Cookie("adminUsername",username);
                    adminUsername.setMaxAge(60*24*7);

                    String password = URLEncoder.encode(adminUser.getPassword(),"utf-8");
                    Cookie adminPassword = new Cookie("adminPassword",password);
                    adminPassword.setMaxAge(60*24*7);
                    response.addCookie(adminUsername);
                    response.addCookie(adminPassword);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            HttpSession session = request.getSession();
            session.setAttribute("adminUser",adminUser1);
            return "indexOfAdmin";
        }
    }

    /**
     * 后台修改个人信息(用户名和密码)后,将原来
     * 的用户信息从session中删除,跳转至登录页
     * @param request
     * @return
     */
    @AdminLogin
    @RequestMapping("/update")
    public String update(HttpServletRequest request){
        HttpSession session = request.getSession();
        //从session中删除原来用户的信息
        session.removeAttribute("adminUser");
        return "redirect:/admin/login.do";
    }

    /**
     * 退出登录
     * 删除session中的后台用户信息,跳转至前台首页
     * @param request
     * @return
     */
    @AdminLogin
    @RequestMapping("/exit")
    public String exit(HttpServletRequest request){
        HttpSession session = request.getSession();
        //从session中删除后台用户信息,请求转发至前台页面
        session.removeAttribute("adminUser");
        return "forward:/index.do";
    }

    @AdminLogin
    @RequestMapping("/changeInfo")
    public String changeInfo(AdminUser adminUser){
        adminUserService.updateAdminUser(adminUser);
        return "redirect:login.do";
    }
}
