package org.heida.util;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AdminLoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o){
        if(o instanceof HandlerMethod){
            String path = request.getSession().getServletContext().getContextPath();
            Object adminUser = request.getSession().getAttribute("adminUser");
            HandlerMethod method = (HandlerMethod)o;
            AdminLogin adminLogin = method.getMethodAnnotation(AdminLogin.class);
            if(adminLogin!=null) {
                if (adminUser != null) {
                    return true;
                } else {
                    try {
                        response.sendRedirect(path + "/admin/login.do");
                        return false;
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            return true;
        }else{
            return true;
        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
