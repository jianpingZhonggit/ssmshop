package org.heida.controller;

import org.heida.model.Category;
import org.heida.model.CategorySecond;
import org.heida.model.CategorySecondExt;
import org.heida.model.PageBean;
import org.heida.service.impl.CategorySecondService;
import org.heida.util.AdminLogin;
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

    /**
     * 根据查询条件显示二级类目列表
     * @param model
     * @param pageBean
     * @return
     */
    @AdminLogin
    @RequestMapping("/categorySecondList")
    public String categorySecondList(Model model, PageBean<CategorySecondExt> pageBean){
        //根据pageBean中查询条件将符合的二级类目放在pageBean中的recordList中
        PageBean<CategorySecondExt> pageBean1 = categorySecondService.getPageBean(pageBean);
        //将结果传至二级类目管理页面
        model.addAttribute("pageBean",pageBean1);
        return "categorySecondList";
    }

    /**
     * 根据前台传入的一级类目id输出所属的二级类目的名称和id
     * @param cid
     * @param response
     */
    @AdminLogin
    @RequestMapping("/change")
    public void change(String cid, HttpServletResponse response){
        try {
            response.setContentType("text/html;charSet=utf-8");
            response.resetBuffer();
            PrintWriter writer = response.getWriter();
            if(cid==null){//前台未选择一级类目,则打印""
                writer.print("");
                return;
            }
            List<CategorySecond> categorySecondListByCid = categorySecondService.getCategorySecondListByCid(Integer.valueOf(cid));
            String str = "";
            //以名称?id&名称?id的形式传回前台解析
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

    /**
     * 删除二级类目(只有那些不含商品的二级类目才可以删除)
     * @param request
     * @param csid
     * @return
     */
    @AdminLogin
    @RequestMapping("/delCategorySecond")
    public String delCategorySecond(HttpServletRequest request,Integer csid){
        //根据二级类目id查询所属商品数目,只有不含商品的二级类目才可以删除
        Integer categorySecondCount = categorySecondService.getProductCountByCsid(csid);
        if(categorySecondCount!=0){//含有商品,不能删除
            request.setAttribute("delCategoryId",csid);
        }else{//不含商品,可以删除
            categorySecondService.delCategorySecondByCsid(csid);
        }
        return "forward:categorySecondList.do";
    }

    @AdminLogin
    @RequestMapping("addCategorySecondBefore")
    public String addCategorySecondBefore(Model model,PageBean<CategorySecond> pageBean){
        List<Category> categoryList = categorySecondService.getCategoryList();
        model.addAttribute("pageBean",pageBean);
        model.addAttribute("categoryList",categoryList);
        return "addCategorySecond";
    }
    @AdminLogin
    @RequestMapping("/addCategorySecond")
    public String addCategorySecond(HttpServletRequest request,PageBean<CategorySecond> pageBean,CategorySecond categorySecond){
        categorySecondService.addCategorySecond(categorySecond);
        request.setAttribute("pageBean",pageBean);
        return "forward:categorySecondList.do";
    }

    @AdminLogin
    @RequestMapping("/toUpdateCategorySecond")
    public String toUpdateCategorySecond(Model model,Integer csid,PageBean<CategorySecond> pageBean){
        CategorySecond categorySecond = categorySecondService.getCategorySecondByCsid(csid);
        List<Category> categoryList = categorySecondService.getCategoryList();
        model.addAttribute("categoryList",categoryList);
        model.addAttribute("pageBean",pageBean);
        model.addAttribute("categorySecond",categorySecond);
        return "updateCategorySecond";
    }

    @AdminLogin
    @RequestMapping("/updateCategorySecond")
    public String updateCategorySecond(HttpServletRequest request,CategorySecond categorySecond,PageBean<CategorySecond> pageBean){
        categorySecondService.updateCategorySecond(categorySecond);
        request.setAttribute("pageBean",pageBean);
        return "forward:categorySecondList.do";
    }
}
