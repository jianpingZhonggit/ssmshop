package org.heida.service.impl.impl;

import org.heida.dao.CategorySecondDao;
import org.heida.model.Category;
import org.heida.model.CategorySecond;
import org.heida.model.CategorySecondExt;
import org.heida.model.PageBean;
import org.heida.service.impl.CategorySecondService;
import org.heida.service.impl.CategoryService;
import org.heida.service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Service
public class CategorySecondServiceImpl implements CategorySecondService {
    private final Integer pageSize = 9;
    @Autowired
    private CategorySecondDao categorySecondDao;
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;

    /**
     * 调用categorySecondDao的getCategorySecondListByCid方法获得
     * 二级类目列表
     * @param cid 一级类目id
     * @return 二级类目列表集合
     */
    @Override
    public List<CategorySecond> getCategorySecondListByCid(Integer cid) {
        return categorySecondDao.getCategorySecondListByCid(cid);
    }

    @Override
    public PageBean<CategorySecondExt> getPageBean(PageBean<CategorySecondExt> pageBean) {
        if(pageBean.getPageNow()==null){
            pageBean.setPageNow(1);
        }
        pageBean.setPageSize(pageSize);
        pageBean.setRowCount(categorySecondDao.getRowCount(pageBean));
        if(pageBean.getRowCount()%pageSize==0){
            pageBean.setPageCount(pageBean.getRowCount()/pageSize);
        }else{
            pageBean.setPageCount(pageBean.getRowCount()/pageSize+1);
        }
        if(pageBean.getPageCount()<pageBean.getPageNow()&&pageBean.getPageCount()>0){
            pageBean.setPageNow(pageBean.getPageCount());
        }
        pageBean.setStartLimit(pageBean.getPageNow()*pageSize-pageSize);
        pageBean.setRecordList(categorySecondDao.getCategorySecondExtList(pageBean));
        return pageBean;
    }

    @Override
    public Integer getCategorySecondCountByCid(Integer cid) {
        return categorySecondDao.getCategorySecondCountByCid(cid);
    }

    @Override
    public Integer getProductCountByCsid(Integer csid) {
        return productService.getProductCountByCsid(csid);
    }

    @Override
    public void delCategorySecondByCsid(Integer csid) {
        categorySecondDao.delCategorySecondByCsid(csid);
    }

    @Override
    public List<Category> getCategoryList() {
        return categoryService.getCategoryList();
    }

    @Override
    public void addCategorySecond(CategorySecond categorySecond) {
        categorySecondDao.addCategorySecond(categorySecond);
    }

    @Override
    public CategorySecond getCategorySecondByCsid(Integer csid) {
        return categorySecondDao.getCategorySecondByCsid(csid);
    }

    @Override
    public void updateCategorySecond(CategorySecond categorySecond) {
        categorySecondDao.updateCategorySecond(categorySecond);
    }
}
