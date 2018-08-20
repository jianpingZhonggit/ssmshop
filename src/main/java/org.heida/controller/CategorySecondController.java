package org.heida.controller;

import org.heida.model.CategorySecond;
import org.heida.model.CategorySecondExt;
import org.heida.model.PageBean;
import org.heida.service.impl.CategorySecondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Controller()
@RequestMapping("/categorySecond")
public class CategorySecondController {
    @Autowired
    private CategorySecondService categorySecondService;
    @RequestMapping("/categorySecondList")
    public String categorySecondList(Model model, PageBean<CategorySecondExt> pageBean){
        PageBean<CategorySecondExt> pageBean1 = categorySecondService.getPageBean(pageBean);
        model.addAttribute("pageBean",pageBean1);
        return "categorySecondList";
    }

    @RequestMapping("/change")
    public void change(String cid, HttpServletResponse response){
        try {
            response.setContentType("text/html;charSet=utf-8");
            response.resetBuffer();
            PrintWriter writer = response.getWriter();
            List<CategorySecond> categorySecondListByCid = categorySecondService.getCategorySecondListByCid(Integer.valueOf(cid));
            String str = "";
            for (int i = 0; i < categorySecondListByCid.size() ; i++) {
                if(i==0){
                    str+=categorySecondListByCid.get(i).getCsname();
                    str+="?";
                    str+=categorySecondListByCid.get(i).getCsid();
                }else{
                    str+="&";
                    str+=categorySecondListByCid.get(i).getCsname();
                    str+="?";
                    str+=categorySecondListByCid.get(i).getCsid();
                }
            }
            writer.print(str);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/delCategorySecond")
    public String delCategorySecond(HttpServletRequest request,Integer csid){
        Integer categorySecondCount = categorySecondService.getProductCountByCsid(csid);
        if(categorySecondCount!=0){
            request.setAttribute("delCategoryId",csid);
        }else{
            categorySecondService.delCategorySecondByCsid(csid);
        }
        return "redirect:/categorySecond/categorySecondList.do";
    }
}
