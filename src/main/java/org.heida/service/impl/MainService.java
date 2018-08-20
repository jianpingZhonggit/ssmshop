package org.heida.service.impl;

import org.heida.model.*;
import org.heida.model.PageBean;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 整个项目核心Service,根据主Controller调用其他Service
 * 并处理一些业务拼接
 */
@Service
public interface MainService {
    /**
     * 获得一级类目列表集合
     * @return 一级类目列表集合
     */
    List<Category> getCategoryList();

    /**
     * 根据传入的PageBean对象处理加工获得新的PageBean
     * 主要根据搜索条件获得符合条件的商品列表并加入新的PageBean对象中
     * @param pageBean 待处理加工的PageBean对象
     * @return 处理加工以后的PageBean对象
     */
    PageBean<Product> getPageBean(PageBean<Product> pageBean);

    /**
     *根据一级类目id获得二级类目列表集合
     * @param cid 一级类目id
     * @return 二级类目列表集合
     */
    List<CategorySecond> getCategorySecondListByCid(Integer cid);

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
     * @return 最新商品列表集合
     */
    List<Product> getNewProduct();

    /**
     * 根据商品id和数量生成购物项,在购物车中处理该购物项
     * 若购物车中存在该购物项则该购物项数目加count,否则直接
     * 将该购物项加入购物车
     * @param pid
     * @param count
     * @param cart
     * @return
     */
    Cart dealCart(Integer pid, Integer count, Object cart);
}
