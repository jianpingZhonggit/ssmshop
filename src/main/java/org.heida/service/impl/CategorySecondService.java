package org.heida.service.impl;

import org.heida.model.Category;
import org.heida.model.CategorySecond;
import org.heida.model.CategorySecondExt;
import org.heida.model.PageBean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategorySecondService {
    /**
     * 通过一级类目获得二级类目列表集合
     * @param cid 一级类目id
     * @return 二级类目列表集合
     */
    List<CategorySecond> getCategorySecondListByCid(Integer cid);
    PageBean<CategorySecondExt> getPageBean(PageBean<CategorySecondExt> pageBean);

    Integer getCategorySecondCountByCid(Integer cid);

    Integer getProductCountByCsid(Integer csid);

    void delCategorySecondByCsid(Integer csid);

    List<Category> getCategoryList();

    void addCategorySecond(CategorySecond categorySecond);

    CategorySecond getCategorySecondByCsid(Integer csid);

    void updateCategorySecond(CategorySecond categorySecond);
}
