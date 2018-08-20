package org.heida.service.impl.impl;

import org.heida.dao.CategoryDao;
import org.heida.model.Category;
import org.heida.model.CategoryExt;
import org.heida.model.CategorySecond;
import org.heida.model.PageBean;
import org.heida.service.impl.CategorySecondService;
import org.heida.service.impl.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final Integer pageSize = 9;
    @Autowired
    private CategoryDao categoryDao;
    @Autowired
    private CategorySecondService categorySecondService;

    /**
     * 调用categoryDao的getCategoryList方法获得一级类目列表集合
     * @return 一级类目列表集合
     *
     *Integer[] getList(){
     *
     *}
     */
    @Override
    public List<Category> getCategoryList() {
        return categoryDao.getCategoryList();
    }

    @Override
    public PageBean<CategoryExt> getPageBean(PageBean<CategoryExt> pageBean) {
        if(pageBean.getPageNow()==null){
            pageBean.setPageNow(1);
        }
        pageBean.setPageSize(pageSize);
        pageBean.setStartLimit(pageBean.getPageNow()*pageSize-pageSize);
        pageBean.setRowCount(categoryDao.getRowCount(pageBean));
        if(pageBean.getRowCount()%pageSize==0){
            pageBean.setPageCount(pageBean.getRowCount()/pageSize);
        }else{
            pageBean.setPageCount(pageBean.getRowCount()/pageSize+1);
        }
        if(pageBean.getPageCount()<pageBean.getPageNow()){
            pageBean.setPageNow(pageBean.getPageCount());
        }
        pageBean.setRecordList(categoryDao.getCategoryExtList(pageBean));
        return pageBean;
    }

    @Override
    public Integer getCategorySecondCountByCid(Integer cid) {
        return categorySecondService.getCategorySecondCountByCid(cid);
    }

    @Override
    public void delCategoryByCid(Integer cid) {
        categoryDao.delCategoryByCid(cid);
    }


}
