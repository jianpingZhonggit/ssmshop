package org.heida.controller;

import org.heida.model.*;
import org.heida.service.impl.OrderService;
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
    @RequestMapping("/order")
    public String order(String state,Model model, HttpServletRequest request){
        List<Category> categoryList = orderService.getCategoryList();
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        List<OrderExt> orderList = orderService.getOrderList(state,user.getUid());
        model.addAttribute("categoryList",categoryList);
        model.addAttribute("orderList",orderList);
        model.addAttribute("state",state);
        return "order";
    }

    @RequestMapping("/orderList")
    public String orderList(Model model, PageBeanExt pageBeanExt){
        PageBeanExt pageBeanExt1 = orderService.getPageBeanExt(pageBeanExt);
        model.addAttribute("pageBean",pageBeanExt1);
        return "orderList";
    }

    @RequestMapping("/delOrder")
    public String delOrder(HttpServletRequest request,Integer oid,PageBeanExt pageBeanExt){
        Integer orderItemCount = orderService.getOrderItemCountByOid(oid);
        if(orderItemCount!=0){
            request.setAttribute("delOid",oid);
        }else{
            orderService.delOrderByOid(oid);
        }
        return "redirect:/order/orderList.do"+
                "?pageNow="+pageBeanExt.getPageNow()+
                "&startTime="+pageBeanExt.getStartTime()+
                "&endTime="+pageBeanExt.getEndTime()+
                "&keywords="+pageBeanExt.getKeywords()+
                "&state="+pageBeanExt.getState();
    }

    @RequestMapping("/updateOrder")
    public String updateOrder(String state1,Order order,PageBeanExt pageBeanExt){
        orderService.updateOrder(order);
        return "redirect:/order/orderList.do?" +
                "pageNow="+pageBeanExt.getPageNow()+
                "&startTime="+pageBeanExt.getStartTime()+
                "&endTime="+pageBeanExt.getEndTime()+
                "&keywords="+pageBeanExt.getKeywords()+
                "&state="+state1;
    }

    @RequestMapping("/orderDetail")
    public String orderDetail(Model model,Integer oid,PageBeanExt pageBeanExt){
        OrderExt order = orderService.getOrderExtByOid(oid);
        model.addAttribute("pageBean",pageBeanExt);
        model.addAttribute("orderExt",order);
        return "updateOrder";
    }

    @RequestMapping("/pay")
    public String pay(Order order){
        // 支付功能和修改订单状态
        order.setState(1);
        order.setOrdertime(new Date());
        orderService.changeOrder(order);
        System.out.println("bbb");
        return "redirect:/index.do";
    }

    @RequestMapping("/dealOrder")
    public String dealOrder(HttpServletRequest request,Model model,Integer oid,Integer[] pid,Integer[] count){
        HttpSession session = request.getSession();
        User user= (User)session.getAttribute("user");
        List<CartItem> shop = orderService.shop(oid,pid,count);
        Double total = orderService.getTotal(shop);
        Integer oid1 = orderService.dealShop(oid,shop,user.getUid());
        model.addAttribute("oid",oid1);
        model.addAttribute("shop",shop);
        model.addAttribute("total",total);
        return "shopping";
    }
}
