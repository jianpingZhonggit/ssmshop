package org.heida.service.impl;

import org.heida.model.Category;
import org.heida.model.CategoryExt;
import org.heida.model.PageBean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    /**
     * 获得一级类目列表集合
     * @return 一级类目列表集合
     */
    List<Category> getCategoryList();
    PageBean<CategoryExt> getPageBean(PageBean<CategoryExt> pageBean);

    Integer getCategorySecondCountByCid(Integer cid);

    void delCategoryByCid(Integer cid);

    void addCategory(Category category);

    Category getCategoryByCid(Integer cid);

    void updateCategory(Category category);
}
