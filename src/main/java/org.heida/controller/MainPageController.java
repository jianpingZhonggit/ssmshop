package org.heida.controller;

import org.heida.model.*;
import org.heida.service.impl.MainService;
import org.heida.model.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.LinkedList;
import java.util.List;

@Controller
public class MainPageController {
    @Autowired
    private MainService mainService;

    /**
     * 首页(主页面)
     * 主要包含一级类目,热门商品和最新商品
     * @param model 将主页面所需的参数封装在Model对象中
     * @return  跳转至主页面
     */
    @RequestMapping("/index")
    public String index(Model model){
        List<Category> categoryList = mainService.getCategoryList();
        List<Product> hotProductList = mainService.getHotProduct();
        List<Product> newProductList = mainService.getNewProduct();
        model.addAttribute("categoryList",categoryList);
        model.addAttribute("hotProductList",hotProductList);
        model.addAttribute("newProductList",newProductList);
        return "index";
    }

    @RequestMapping("/indexOfAdmin")
    public String indexOfAdmin(){
        return "indexOfAdmin";
    }


    /**
     * 搜索条件主要包括三个
     * 1、一级类目精确搜索
     * 2、二级类目精确搜索
     * 3、名字模糊搜索
     * 商品列表页面
     * 若要跳转的是根据名字模糊搜索的商品列表页面则只需要封装一级类目
     * 和符合搜索条件的商品列表
     * 若不是通过名字模糊搜索的商品列表页面则还需要封装二级类目信息
     * 和符合搜索条件的商品列表
     * @param model  封装需要跳转页面的参数
     * @param pageBean 封装搜索条件
     * @return
     */
    @RequestMapping("/productList")
    public String productList(Model model, PageBean<Product> pageBean){
        List<Category> categoryList = mainService.getCategoryList();
        PageBean<Product> pageBean1 = mainService.getPageBean(pageBean);
        if(pageBean.getCid()!=null){
            List<CategorySecond> categorySecondList = mainService.getCategorySecondListByCid(pageBean.getCid());
            model.addAttribute("categorySecondList",categorySecondList);
        }
        model.addAttribute("categoryList",categoryList);
        model.addAttribute("pageBean",pageBean1);
        return "productList";
    }

    /**
     *
     * @param pid
     * @param model
     * @return
     */
    @RequestMapping("/productDetail")
    public String productDetail(Integer pid,Model model){
        Product productByPid = mainService.getProductByPid(pid);
        List<Category> categoryList = mainService.getCategoryList();
        model.addAttribute("product",productByPid);
        model.addAttribute("categoryList",categoryList);
        return "productDetail";
    }

    /**
     *
     * @param model
     * @param pid
     * @param count
     * @param request
     * @return
     */
    @RequestMapping("/cart")
    public String cart(Model model, Integer pid, Integer count, HttpServletRequest request){
        List<Category> categoryList = mainService.getCategoryList();
        model.addAttribute("categoryList",categoryList);
        HttpSession session = request.getSession();
        Object cart = session.getAttribute("cart");
        Cart newCart = mainService.dealCart(pid,count,cart);

        session.setAttribute("cart",newCart);
        return "cart";
    }
}
