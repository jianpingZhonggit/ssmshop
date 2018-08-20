package org.heida.controller;

import org.heida.model.CategoryExt;
import org.heida.model.PageBean;
import org.heida.service.impl.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @RequestMapping("/categoryList")
    public String categoryList(Model model, PageBean<CategoryExt> pageBean){
        PageBean<CategoryExt> pageBean1 = categoryService.getPageBean(pageBean);
        model.addAttribute("pageBean",pageBean1);
        return "categoryList";
    }

    @RequestMapping("/delCategory")
    public String delCategory(HttpServletRequest request,Integer cid){
        Integer categorySecondCount = categoryService.getCategorySecondCountByCid(cid);
        if(categorySecondCount!=0){
            request.setAttribute("delCid",cid);
        }else{
            categoryService.delCategoryByCid(cid);
        }
        return "redirect:/category/categoryList.do";
    }
}
