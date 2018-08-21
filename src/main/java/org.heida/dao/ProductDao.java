package org.heida.dao;

import org.heida.model.PageBean;
import org.heida.model.Product;

import java.util.List;

public interface ProductDao {
    /**
     * 根据pageBean对象中的搜索条件获得商品列表集合
     * @param pageBean 封装搜索条件(主要包括一级类目cid,
     *                 二级类目csid,一级搜索的商品名字keywords)
     * @return 商品列表集合
     */
    List<Product> getProductListByPage(PageBean<Product> pageBean);

    /**
     * 根据商品的pid获得商品
     * @param pid 商品id
     * @return 商品对象
     */
    Product getProductByPid(Integer pid);

    /**
     *获得热门商品列表集合
     * @return 热门商品列表集合
     */
    List<Product> getHotProduct();

    /**
     *获得最新商品列表集合
     * @return 获得最新商品列表集合
     */
    List<Product> getNewProduct();

    /**
     * 根据搜索条件获得符合条件的商品数目(用于分页)
     * @param pageBean 封装搜索条件
     * @return 合条件的商品数目
     */
    Integer getRowCountByPage(PageBean<Product> pageBean);

    void delProductById(Integer pid);

    Integer getProductCountByCsid(Integer csid);

    void updateProductByPid(Product product);

    void addProduct(Product product);

}
