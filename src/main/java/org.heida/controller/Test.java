package org.heida.controller;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.heida.dao.ProductDao;
import org.heida.model.Product;
import org.heida.service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Controller
@RequestMapping("/test")
public class Test {
    /**
     * 文件上传
     * @return
     */
//    @RequestMapping("/upload1")
//    public String upload(HttpServletRequest request,MultipartFile file){
//        System.out.println("upload begin");
//        if(!file.isEmpty()){
//            //上传文件路径
//            System.out.println("开始");
//            String path = request.getSession().getServletContext().getRealPath("upload");
//            //上传文件名
//            String filename = file.getOriginalFilename();
//            File filepath = new File(path,filename);
//            //判断路径是否存在,如果不存在就创建一个
//            if(!filepath.getParentFile().exists()){
//                filepath.getParentFile().mkdirs();
//            }
//            //将上传文件保存在一个目标文件中
//            try {
//                file.transferTo(new File(path+File.separator+filename));
//                return null;
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }else{
//            return null;
//        }
//        return "upload";
//    }

    @RequestMapping("/upload")
    public void upload(HttpServletRequest request){
        //得到上传文件的保存目录,将上传文件
        //存放在WEB-INF目录下,不允许外界直接访问
        //保证上传文件的安全
        String savePath = request.getSession().getServletContext().getRealPath("/imagesTest/");
        File file = new File(savePath);
        //判断文件的保存目录是否存在
        if(!file.exists()&&!file.isDirectory()){
            System.out.println(savePath+"目录不存在,需要创建");
            //创建目录
            file.mkdir();
        }
        //消息提示
        String message = "";
        //使用Apache文件上传文件处理文件上传步骤:
        //1、创建一个DiskFileFactory工厂
        DiskFileItemFactory factory = new DiskFileItemFactory();
        //2、创建一个文件上传解析器
        ServletFileUpload upload = new ServletFileUpload(factory);
        //解决上传文件名的中文乱码
        upload.setHeaderEncoding("utf-8");
        //3、判断提交的数据是否是上传表单的数据
        if(!ServletFileUpload.isMultipartContent(request)){
            //按照传统方式获取数据
            return;
        }
        //4、使用ServletFileUpload解析器解析上传数据,解析结果返回的是
        //一个List<FileItem>集合,每一个FileItem对应一个Form表单的输入项
        try {
            List<FileItem> list = upload.parseRequest(request);
            for(FileItem item:list){
                //如果fileItem中封装的是普通输入项的数据
                if(item.isFormField()){
                    String name = item.getFieldName();
                    //解决普通输入项的数据中文乱码问题
                    try {
                        String value = item.getString("utf-8");
                        System.out.println(name+"="+value);
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                }else{
                    //如果fileItem中封装的是上传文件
                    //得到上传文件名称
                    String filename = item.getName();
                    System.out.println(filename);
                    if(filename==null||filename.trim().equals("")){
                        continue;
                    }
                    System.out.println("*********");
                    filename = filename.substring(filename.lastIndexOf("\\"+1));
                    //获取item中的上传文件的输入流
                    try {
                        InputStream in = item.getInputStream();
                        //创建一个文件输出流
                        FileOutputStream out = new FileOutputStream(savePath+"\\"+filename);
                        //创建一个缓冲区
                        byte[] buffer = new byte[1024];
                        //判断输入流中的数据是否已经读完标识
                        int len = 0;
                        //循环将输入流读入到缓冲区中,(len=in.read(buffer))>0就表示in里面还有数据
                        while ((len=in.read(buffer))>0){
                            //使用FileOutputStream输出流将缓冲区的数据写入到指定的
                            //目录(savePath+"\\"+filename)当中
                            out.write(buffer,0,len);
                        }
                        //关闭输入流
                        in.close();
                        //关闭输出流
                        out.close();
                        //删除处理文件上传生成的临时文件
                        item.delete();
                        message = "文件上传成功";
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        }
        request.setAttribute("message",message);
    }

//    @Autowired
//    private ProductDao productDao;
//    @RequestMapping("/hello")
//    public void hello(){
//        productDao.test();
//    }
     @RequestMapping("/read")
     public void read(String username,String content){
         System.out.println(username);
         System.out.println(content);
     }

     @Autowired
     private ProductDao productDao;
     @RequestMapping("/index")
     public void index(){
         String pnames[]={
                 "韩版连帽加厚毛衣女外套","女装立领长袖拼接PU皮毛呢",
                 "韩版女装翻领羔绒夹棉格子毛","冬装韩版女装翻领羔绒夹棉格子毛呢",
                 "新款优雅奢华毛领白鸭绒轻薄羽","秋冬季毛呢外套女中长款圆领小香",
                 "女装貉子毛大衣 时尚修身长袖淑","修身显瘦淑女针织长袖打底连衣",
                 "整貂皮大衣外套中长款收腰立领长袖","中长款貂皮大衣整貂女装",
                 "韩版毛呢外套女韩范秋冬装厚中长款","打底衫加厚修身羊毛衫女装羊绒衫",
                 "性感时尚 酷感黑色小圆领露肩","韩版黑色打底衫加厚修身羊毛",
                 "冬装外套棉衣立领修身商务","商务修身羊毛呢子风衣",
                 "韩版修身羽绒服加厚","女鞋",
                 "短靴1","短靴2",
                 "短靴3","短靴4",
                 "女款短靴","Thinkpad",
                 "联想电脑","女装立领长袖拼接PU皮",
                 "小米6","小米max2",
                 "小米8","华为荣耀6x",
                 "华为荣耀7x","华为mate8",
                 "华为mate9","华为mate10",
                 "魅蓝note2","魅蓝note6",
                 "魅蓝max2","一加3T",
                 "一加5T","360Ns4",
                 "联想游戏本","华硕笔记本",
                 "外星人电脑","神州战神",
                 "惠普"
         };
        productDao.update();
        List<Product> productList = productDao.getProduct();
        int len = pnames.length;
        for (int i = 0; i <productList.size() ; i++) {
             Product product = productList.get(i);
             product.setPname(pnames[i%len]);
             productDao.updateProduct(product);
         }
    }


}
