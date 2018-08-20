package org.heida.service.impl.impl;

import org.heida.dao.ProductDao;
import org.heida.model.Category;
import org.heida.model.CategorySecond;
import org.heida.model.PageBean;
import org.heida.model.Product;
import org.heida.service.impl.CategorySecondService;
import org.heida.service.impl.CategoryService;
import org.heida.service.impl.OrderItemService;
import org.heida.service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final Integer pageSize = 10;
    @Autowired
    private ProductDao productDao;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategorySecondService categorySecondService;
    @Autowired
    private OrderItemService orderItemService;


    @Override
    public PageBean<Product> getPageBean(PageBean<Product> pageBean) {
        PageBean<Product> newPageBean = new PageBean<Product>();
        newPageBean.setPageSize(pageSize);
        newPageBean.setCid(pageBean.getCid());
        newPageBean.setCsid(pageBean.getCsid());
        newPageBean.setKeywords(pageBean.getKeywords());
        if(pageBean.getPageNow()==null){
            newPageBean.setPageNow(1);
        }else{
            newPageBean.setPageNow(pageBean.getPageNow());
        }
        newPageBean.setStartLimit((newPageBean.getPageNow()-1)*pageSize);
        newPageBean.setRowCount(productDao.getRowCountByPage(newPageBean));
        if(newPageBean.getRowCount()%pageSize==0){
            newPageBean.setPageCount(newPageBean.getRowCount()/pageSize);
        }else{
            newPageBean.setPageCount(newPageBean.getRowCount()/pageSize+1);
        }
        if(newPageBean.getPageCount()<newPageBean.getPageNow()){
            newPageBean.setPageNow(newPageBean.getPageCount());
        }
        newPageBean.setRecordList(productDao.getProductListByPage(newPageBean));
        return newPageBean;
    }

    @Override
    public Product getProductByPid(Integer pid) {
        return productDao.getProductByPid(pid);
    }

    @Override
    public List<Product> getHotProduct() {
        return productDao.getHotProduct();
    }

    @Override
    public List<Product> getNewProduct() {
        return productDao.getNewProduct();
    }



    @Override
    public List<Category> getCategoryList() {
        return categoryService.getCategoryList();
    }

    @Override
    public List<CategorySecond> getCategorySecondListByCid(Integer cid) {
        if(cid!=null){
            return categorySecondService.getCategorySecondListByCid(cid);
        }
        return null;
    }

    @Override
    public void delProductById(Integer pid) {
        productDao.delProductById(pid);
    }

    @Override
    public Integer getProductCountByCsid(Integer csid) {
        return productDao.getProductCountByCsid(csid);
    }

    @Override
    public Integer getOrderItemCountByPid(Integer pid) {
        return orderItemService.getOrderItemCountByPid(pid);
    }

    @Override
    public void updateProductByPid(Product product) {
        productDao.updateProductByPid(product);
    }

    @Override
    public void addProduct(Product product) {
        productDao.addProduct(product);
    }
}
