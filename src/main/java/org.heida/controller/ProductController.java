package org.heida.controller;

import org.heida.model.Category;
import org.heida.model.CategorySecond;
import org.heida.model.PageBean;
import org.heida.model.Product;
import org.heida.service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    /**
     * 后台商品管理列表
     * @param model
     * @param pageBean
     * @return
     */
    @RequestMapping("/productListOfAdmin")
    public String productListOfAdmin(Model model, PageBean<Product> pageBean){
        //根据查询条件查找符合条件的商品,生成商品列表,和查询条件
        PageBean<Product> pageBean1 = productService.getPageBean(pageBean);
        List<Category> categoryList = productService.getCategoryList();
        List<CategorySecond> categorySecondList = productService.getCategorySecondListByCid(pageBean.getCid());
        model.addAttribute("categoryList",categoryList);
        model.addAttribute("categorySecondList",categorySecondList);
        model.addAttribute("pageBean",pageBean1);
        return "productListOfAdmin";
    }

    @RequestMapping("/delProduct")
    public String delProduct(HttpServletRequest request,Integer pid){
        Integer orderItemCount = productService.getOrderItemCountByPid(pid);
        if(orderItemCount!=0){
            request.setAttribute("delPid",pid);
        }else{
            productService.delProductById(pid);
        }
        return "redirect:/product/productListOfAdmin.do";
    }

    @RequestMapping("/batchDelProduct")
    public String batchDelProduct(Integer[] checked){
        if(checked!=null){
            for (int i = 0; i < checked.length; i++) {
                productService.delProductById(checked[i]);
            }
        }
        return "redirect:/product/productListOfAdmin.do";
    }

    @RequestMapping("/productDetail")
    public String productDetail(Integer pid,Model model,PageBean<Product> pageBean){
        Product productByPid = productService.getProductByPid(pid);
        model.addAttribute("pageBean",pageBean);
        model.addAttribute("product",productByPid);
        return "updateProduct";
    }

    @RequestMapping("/updateProduct")
    public String updateProduct(Product product,PageBean<Product> pageBean){
        productService.updateProductByPid(product);
        return "redirect:/product/productList.do"
                +"?pageNow="+pageBean.getPageNow()
                +"&keywords="+pageBean.getKeywords()
                +"&csid="+pageBean.getCsid()
                +"&cid="+pageBean.getCid();
    }

    @RequestMapping("/addProduct")
    public String addProduct(Model model,Product product,PageBean<Product> pageBean){
        if(product.getIs_hot()==null){
            model.addAttribute("product",product);
            return "addProduct";
        }
        productService.addProduct(product);
        return "redirect:/product/productListOfAdmin.do"
                +"?pageNow="+pageBean.getPageNow()
                +"&keywords="+pageBean.getKeywords()
                +"&csid="+pageBean.getCsid()
                +"cid="+pageBean.getCid();
    }
}
