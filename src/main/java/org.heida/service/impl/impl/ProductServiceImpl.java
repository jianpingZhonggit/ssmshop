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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.List;
import java.util.UUID;

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
    public PageBean<Product> getPageBean(PageBean<Product> pageBean,Integer is_off) {
        if(pageBean.getPageNow()==null){
            pageBean.setPageNow(1);
        }
        pageBean.setPageSize(pageSize);
        if(is_off==1) {
            pageBean.setRowCount(productDao.getRowCountByPage(pageBean));
        }else{
            pageBean.setRowCount(productDao.getAllRowCountByPage(pageBean));
        }
        if(pageBean.getRowCount()%pageSize==0){
            pageBean.setPageCount(pageBean.getRowCount()/pageSize);
        }else{
            pageBean.setPageCount(pageBean.getRowCount()/pageSize+1);
        }
        if(pageBean.getPageCount()<pageBean.getPageNow()&&pageBean.getPageCount()>0){
            pageBean.setPageNow(pageBean.getPageCount());
        }
        pageBean.setStartLimit((pageBean.getPageNow()-1)*pageSize);
        if(is_off==1) {
            pageBean.setRecordList(productDao.getProductListByPage(pageBean));
        }else{
            pageBean.setRecordList(productDao.getAllProductListByPage(pageBean));
        }
        return pageBean;
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
    public void updateProductByPid(HttpServletRequest request,MultipartFile pic,Product product) {
        if(!pic.isEmpty()){
            String savePath = request.getSession().getServletContext().getRealPath("/images/");
            //删除原来的图片
            File file = new File(savePath+product.getImage());
            file.delete();
            //上传新的图片
            product.setImage(UUID.randomUUID()+pic.getOriginalFilename());
            try {
                InputStream is = pic.getInputStream();
                FileOutputStream fs = new FileOutputStream(savePath+product.getImage());
                byte[] buffer = new byte[1024];
                int len;
                while ((len=is.read(buffer))>0){
                    fs.write(buffer,0,len);
                }
                is.close();
                fs.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        productDao.updateProductByPid(product);
    }

    @Override
    public void addProduct(HttpServletRequest request,MultipartFile image, Product product) {
        //得到上传文件的保存目录,将上传文件
        String savePath = request.getSession().getServletContext().getRealPath("/images/");
        File file = new File(savePath);
        //判断文件的保存目录是否存在
        if (!file.exists() && !file.isDirectory()) {
            System.out.println(savePath + "目录不存在,需要创建");
            //创建目录
            file.mkdir();
        }
        if(!image.isEmpty()){
            //得到上传文件名称
            product.setImage(UUID.randomUUID()+image.getOriginalFilename());
            product.setIs_off(1);
            productDao.addProduct(product);
            String filename = product.getImage();
            //获取item中的上传文件的输入流
            try {
                InputStream in = image.getInputStream();
                //创建一个文件输出流
                FileOutputStream out = new FileOutputStream(savePath + "\\" + filename);
                //创建一个缓冲区
                byte[] buffer = new byte[1024];
                //判断输入流中的数据是否已经读完标识
                int len;
                //循环将输入流读入到缓冲区中,(len=in.read(buffer))>0就表示in里面还有数据
                while ((len = in.read(buffer)) > 0) {
                    //使用FileOutputStream输出流将缓冲区的数据写入到指定的
                    //目录(savePath+"\\"+filename)当中
                    out.write(buffer, 0, len);
                }
                //关闭输入流
                in.close();
                //关闭输出流
                out.close();
            }catch (Exception e){

            }
        }
    }

    @Override
    public void addHotByPid(Integer pid) {
        productDao.addHotByPid(pid);
    }
}
