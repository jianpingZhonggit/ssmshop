package org.heida.controller;

import cn.dsna.util.images.ValidateCode;
import org.heida.model.PageBean;
import org.heida.model.User;
import org.heida.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;



    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    @RequestMapping("/register")
    public String register(){
        return "register";
    }

    @RequestMapping("validate")
    public void validate(HttpServletResponse response, HttpServletRequest request){
        ValidateCode validateCode = new ValidateCode(180,35,4,20);
        try {
            HttpSession session = request.getSession();
            response.setHeader("Pragma","No-Cache");
            response.setHeader("Cache-Control","No-Cache");
            response.setDateHeader("Expires", 0);
            session.setAttribute("code",validateCode.getCode());
            validateCode.write(response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/loginUser")
    public String loginUser(User user, String code, HttpServletRequest request){
        //检查待登录的用户是否正确,正确时返回user所有信息,其他均返回null
        User temp = userService.checkLoginUser(user);
        HttpSession session = request.getSession();
        String rightCode = (String)session.getAttribute("code");
        //根据返回的结果分发转向
        if(temp==null){
            //用户信息错误时,用request对象返回相应错误信息
            request.setAttribute("msg", "用户名或密码错误!");
            return "login";
        }else{
            if(code.equals("")){
                request.setAttribute("msg", "输入验证码");
                request.setAttribute("loginUser",temp);
                return "forward:login.do";
            }else if(!(code.equals(rightCode))){
                request.setAttribute("msg", "验证码错误");
                request.setAttribute("loginUser",temp);
                return "forward:login.do";
            }else{
                //用户名和密码正确时将用户信息存在session中,并跳转至主页面
                if(temp.getState()==0){
                    request.setAttribute("msg", "存在违规操作,已被禁止登陆!");
                    return "forward:login.do";
                }else{
                    session.setAttribute("user", temp);
                    return "forward:/index.do";
                }
            }
        }
    }

    @RequestMapping("/registerUser")
    public String registerUser(Model model,User user, String pwd){

        //检查待注册的用户信息是否正确,只有有户名未被注册且密码和确认密码一致
        //以及信息完整时返回True
        boolean result = userService.checkRegisterUser(user, pwd);
        //根据返回的结果分发转向
        if(result){
            return "redirect:/user/login.do";
        }else{
            //注册失败时,需要回显原来正确的信息,以及提示错误的信息

            model.addAttribute("registerUser", user);//返回user信息
            model.addAttribute("register", result);//标记是否点击过注册按钮
            model.addAttribute("pwd",pwd);//返回确认密码
            return "register";
        }
    }

    /**
     * 用户退出
     * @param request
     * @return
     */
    @RequestMapping("/exit")
    public String exit(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        return "redirect:/index.do";
    }

    @RequestMapping("/userList")
    public String userList(Model model,PageBean<User> pageBean){
        PageBean<User> pageBean1 = userService.getPageBean(pageBean);
        model.addAttribute("pageBean",pageBean1);
        return "userList";
    }

    @RequestMapping("/delUser")
    public String delUser(HttpServletRequest request,Integer uid){
        Integer orderCount = userService.getOrderCountByUid(uid);
        if(orderCount!=0){
            request.setAttribute("delUid",uid);
        }else{
            userService.delUserById(uid);
        }
        return "redirect:/user/userList.do";
    }

    @RequestMapping("/batchDel")
    public String batchDelUser(Integer[] id){
        if(id!=null){
            for (int i = 0; i < id.length; i++) {
                userService.delUserById(id[i]);
            }
        }
        return "redirect:/user/userList.do";
    }

    @RequestMapping("/userDetail")
    public String userDetail(Model model,Integer uid,PageBean<User> pageBean){
        User user = userService.getUserByUid(uid);
        model.addAttribute("user",user);
        model.addAttribute("pageBean",pageBean);
        return "updateUser";
    }

    @RequestMapping("/updateUser")
    public String updateUser(User user,PageBean<User> pageBean){
        userService.updateUser(user);
        return "redirect:/user/userList.do"
                +"?pageNow="+pageBean.getPageNow()
                +"&keywords="+pageBean.getKeywords();
    }

    @RequestMapping("/addUser")
    public String addUser(User user,PageBean<User> pageBean){
        if(user==null){
            return "addUser";
        }else{
            return "redirect:/user/userList"
                    +"?pageNow="+pageBean.getPageNow()
                    +"&keywords="+pageBean.getKeywords();
        }
    }
}
