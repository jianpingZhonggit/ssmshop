package org.heida.controller;

import org.heida.model.Category;
import org.heida.model.CategoryExt;
import org.heida.model.PageBean;
import org.heida.service.impl.CategoryService;
import org.heida.util.AdminLogin;
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

    /**
     * 根据查询条件显示一级类目列表
     * @param model
     * @param pageBean
     * @return
     */
    @AdminLogin
    @RequestMapping("/categoryList")
    public String categoryList(Model model, PageBean<CategoryExt> pageBean){
        //根据pageBean中查询条件将符合的一级类目放在pageBean中的recordList中
        PageBean<CategoryExt> pageBean1 = categoryService.getPageBean(pageBean);
        //将结果传至一级类目管理页面
        model.addAttribute("pageBean",pageBean1);
        return "categoryList";
    }

    /**
     * 删除一级类目(只有那些不含二级类目的一级类目可以删除)
     * @param request
     * @param cid 要删除的一级类目的id
     * @return
     */
    @AdminLogin
    @RequestMapping("/delCategory")
    public String delCategory(PageBean<Category> pageBean,HttpServletRequest request,Integer cid){
        //根据一级类目id查找属于该一级类目的二级类目的数量
        Integer categorySecondCount = categoryService.getCategorySecondCountByCid(cid);
        if(categorySecondCount!=0){//含有二级类目,不能删除,返回一级类目管理
            request.setAttribute("delCid",cid);
        }else{//不含二级类目,可以删除
            categoryService.delCategoryByCid(cid);
        }
        request.setAttribute("pageBean",pageBean);
        return "forward:categoryList.do";
    }

    @AdminLogin
    @RequestMapping("/addCategoryBefore")
    public String addCategoryBefore(Model model,PageBean<Category> pageBean){
        model.addAttribute("pageBean",pageBean);
        return "addCategory";
    }

    @AdminLogin
    @RequestMapping("/addCategory")
    public String addCategory(HttpServletRequest request,PageBean<Category> pageBean, Category category){
        categoryService.addCategory(category);
        request.setAttribute("pageBean",pageBean);
        return "forward:categoryList.do";
    }

    @AdminLogin
    @RequestMapping("/toUpdateCategory")
    public String toUpdateCategory(Model model,Integer cid,PageBean<Category> pageBean){
        Category category = categoryService.getCategoryByCid(cid);
        model.addAttribute("pageBean",pageBean);
        model.addAttribute("category",category);
        return "updateCategory";
    }
    @AdminLogin
    @RequestMapping("/updateCategory")
    public String updateCategory(Model model,Category category,PageBean<Category> pageBean){
        categoryService.updateCategory(category);
        model.addAttribute("pageBean",pageBean);
        return "forward:categoryList.do";
    }
}
