package org.heida.util;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserLoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        if(o instanceof HandlerMethod){
            String path = request.getSession().getServletContext().getContextPath();
            Object user = request.getSession().getAttribute("user");
            HandlerMethod method = (HandlerMethod)o;
            UserLogin userLogin = method.getMethodAnnotation(UserLogin.class);
            if(userLogin!=null){
                if(user!=null){
                    return true;
                }else{
                    response.sendRedirect(path+"/user/login.do");
                    return false;
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
