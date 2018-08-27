package org.heida.service.impl;

import org.heida.model.Category;
import org.heida.model.CategorySecond;
import org.heida.model.PageBean;
import org.heida.model.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@Service
public interface ProductService {
//    /**
//     * 根据搜索条件获得商品列表集合
//     * @param pageBean 封装搜索条件
//     * @return 符合搜索条件的商品列表集合
//     */
//    List<Product> getProductListByPage(PageBean<Product> pageBean);
PageBean<Product> getPageBean(PageBean<Product> pageBean,Integer is_off);

    /**
     * 根据商品id获得商品对象
     * @param pid 商品id
     * @return 商品对象
     */
    Product getProductByPid(Integer pid);

    /**
     * 获得热门商品列表集合
     * @return 热门商品列表集合
     */
    List<Product> getHotProduct();

    /**
     * 获得最新商品列表集合
     * @return 新商品列表集合
     */
    List<Product> getNewProduct();

    /**
     *
     * @return
     */
    List<Category> getCategoryList();

    /**
     *
     * @param cid
     * @return
     */
    List<CategorySecond> getCategorySecondListByCid(Integer cid);

    void delProductById(Integer pid);

    Integer getProductCountByCsid(Integer csid);

    Integer getOrderItemCountByPid(Integer pid);

    void updateProductByPid(HttpServletRequest request,MultipartFile pic,Product product);

    void addProduct(HttpServletRequest request,MultipartFile image,Product product);
}
