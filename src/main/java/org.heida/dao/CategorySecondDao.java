package org.heida.dao;

import org.heida.model.CategorySecond;
import org.heida.model.CategorySecondExt;
import org.heida.model.PageBean;

import java.util.List;

public interface CategorySecondDao {
    /**
     * 根据一级类目cid获得二级类目列表
     * @param cid 一级类目id
     * @return 二级类目列表集合
     */
    List<CategorySecond> getCategorySecondListByCid(Integer cid);

    Integer getRowCount(PageBean<CategorySecondExt> pageBean);

    List<CategorySecondExt> getCategorySecondExtList(PageBean<CategorySecondExt> pageBean);

    Integer getCategorySecondCountByCid(Integer cid);

    void delCategorySecondByCsid(Integer csid);

    void addCategorySecond(CategorySecond categorySecond);

    CategorySecond getCategorySecondByCsid(Integer csid);

    void updateCategorySecond(CategorySecond categorySecond);
}
