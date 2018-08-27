package org.heida.controller;

import org.heida.model.*;
import org.heida.service.impl.OrderService;
import org.heida.util.AdminLogin;
import org.heida.util.UserLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    /**
     * 订单页面
     * 根据state的值显示不同的订单页(已完成订单,未完成订单页,全部订单页)
     * @param state
     * @param model
     * @param request
     * @return
     */
    @UserLogin
    @RequestMapping("/order")
    public String order(String state,Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        //订单页面显示的一级类目列表
        List<Category> categoryList = orderService.getCategoryList();
        //根据用户id和需要查找的订单状态(state)查找订单列表
        List<OrderExt> orderList = orderService.getOrderList(state,user.getUid());
        model.addAttribute("categoryList",categoryList);
        model.addAttribute("orderList",orderList);
        model.addAttribute("state",state);
        return "order";
    }

    /**
     * 后台订单管理订单列表
     * @param model
     * @param pageBeanExt
     * @return
     */
    @AdminLogin
    @RequestMapping("/orderList")
    public String orderList(Model model, PageBeanExt pageBeanExt){
        //根据查询条件查找符合条件的订单,生成订单列表,将订单列表封装和查询条件
        //封装在pageBean中,方便回显查询条件
        PageBeanExt pageBeanExt1 = orderService.getPageBeanExt(pageBeanExt);
        model.addAttribute("pageBean",pageBeanExt1);
        return "orderList";
    }

    /**
     * 删除订单(只有没有订单项的订单才可以删除)
     * @param request
     * @param oid
     * @param pageBeanExt
     * @return
     */
    @AdminLogin
    @RequestMapping("/delOrder")
    public String delOrder(HttpServletRequest request,Integer oid,PageBeanExt pageBeanExt){
        //根据订单id查找所属的订单项数目
        Integer orderItemCount = orderService.getOrderItemCountByOid(oid);
        if(orderItemCount!=0){//含有订单项,不能删除
            request.setAttribute("delOid",oid);
        }else{//不含订单项,可以删除
            orderService.delOrderByOid(oid);
        }
        request.setAttribute("pageBean",pageBeanExt);
        // 请求转发
        return "forward:orderList.do";
    }

    /**
     * 更新订单
     * @param state1 查询条件包含订单状态,和真正要修改的订单的状态区别
     * @param order 包含订单状态
     * @param pageBeanExt
     * @return
     */
    @AdminLogin
    @RequestMapping("/updateOrder")
    public String updateOrder(String state1,Order order,PageBeanExt pageBeanExt){
        //更新订单
        orderService.updateOrder(order);
        //回显查询条件
        return "redirect:/order/orderList.do?" +
                "pageNow="+pageBeanExt.getPageNow()+
                "&startTime="+pageBeanExt.getStartTime()+
                "&endTime="+pageBeanExt.getEndTime()+
                "&keywords="+pageBeanExt.getKeywords()+
                "&state="+state1;
    }

    /**
     * 订单详情 包含订单信息和订单项信息以及下单人信息
     * @param model
     * @param oid
     * @param pageBeanExt
     * @return
     */
    @AdminLogin
    @RequestMapping("/orderDetail")
    public String orderDetail(Model model,Integer oid,PageBeanExt pageBeanExt){
        //订单扩展类,包含订单信息,订单项信息,下单人信息
        OrderExt order = orderService.getOrderExtByOid(oid);
        model.addAttribute("pageBean",pageBeanExt);
        model.addAttribute("orderExt",order);
        return "updateOrder";
    }

    /**
     * 订单支付
     * @param order
     * @return
     */
    @UserLogin
    @RequestMapping("/pay")
    public String pay(Order order){
        // 支付功能和修改订单状态
        order.setState(2);
        order.setOrdertime(new Date());
        orderService.changeOrder(order);
        return "redirect:/index.do";
    }

    /**
     * 处理(再次购买已完成的商品,未完成的订单付款)个人订单
     * @param request
     * @param model
     * @param oid
     * @param pid
     * @param count
     * @return
     */
    @UserLogin
    @RequestMapping("/dealOrder")
    public String dealOrder(HttpServletRequest request,Model model,Integer oid,Integer[] pid,Integer[] count){
        HttpSession session = request.getSession();
        User user= (User)session.getAttribute("user");
        //根据订单生成商品购物列表
        List<CartItem> shop = orderService.shop(oid,pid,count);
        //计算总价
        Double total = orderService.getTotal(shop);
        //生成新的订单或者不变
        Integer oid1 = orderService.dealShop(oid,shop,user.getUid());
        model.addAttribute("oid",oid1);
        model.addAttribute("shop",shop);
        model.addAttribute("total",total);
        return "shopping";
    }

    /**
     * 发货
     * @param oid
     * @param pageBeanExt
     * @return
     */
    @AdminLogin
    @RequestMapping("/ship")
    public String ship(Integer oid,PageBeanExt pageBeanExt){
        orderService.ship(oid);
        String url = "redirect:/order/orderList.do"+
                     "?pageNow="+pageBeanExt.getPageNow()+
                     "&startTime="+pageBeanExt.getStartTime()+
                     "&endTime="+pageBeanExt.getEndTime()+
                     "&keywords="+pageBeanExt.getKeywords();
        if(pageBeanExt.getState()!=null){
            url += ("&state="+pageBeanExt.getState());
        }
        return url;
    }

    @UserLogin
    @RequestMapping("/receipt")
    public String receipt(Integer oid){
        orderService.receipt(oid);
        String url = "redirect:/order/order.do?state=1";
        return url;
    }
}
