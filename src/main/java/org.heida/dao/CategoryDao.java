package org.heida.dao;

import org.heida.model.Category;
import org.heida.model.CategoryExt;
import org.heida.model.PageBean;

import java.util.List;

public interface CategoryDao {
    /**
     * 获得一级类目列表
     * @return 一级类目列表集合
     */
    List<Category> getCategoryList();

    List<CategoryExt> getCategoryExtList(PageBean<CategoryExt> pageBean);

    Integer getRowCount(PageBean<CategoryExt> pageBean);

    void delCategoryByCid(Integer cid);
}
