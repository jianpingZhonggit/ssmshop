package org.heida.controller;

import org.heida.model.*;
import org.heida.service.impl.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.LinkedList;
import java.util.List;

@Controller
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    /**
     * 根据购物车页面传入的要删除的商品的pid在session对象中的购物车中删除购物项
     * @param pid  要删除的购物项的商品的pid
     * @param request 获得session对象,继而获得购物车对象
     * @return 返回购物车准备阶段
     */
    @RequestMapping("delCartItem")
    public String delCartItem(Integer pid, HttpServletRequest request){
        HttpSession session = request.getSession();
        //获得session对象中的购物车
        Cart cart = (Cart) session.getAttribute("cart");
        //根据传入的商品对购物车进行相应的操作
        cartService.delCartItem(cart,pid);
        return "redirect:/cart.do";
    }

    /**
     * 判断是否登录,未登录则跳转至购物车界面,并显示提示未登录信息
     * 若已登录,则根据购物车界面勾选的购物项情况生成订单,
     * 以及删除购物车中已勾选的购物项
     * 根据购物项生成订单项,继而生成一个订单
     * @param model 将购物车或者订单页面需要的参数放入model中
     * @param checked 单选框,购物车中已经勾选的购物项的商品的pid数组
     * @param count 所有购物项的商品的数量count数组
     * @param request 获得session对象,继而获得购物车cart对象或者未登录时携带
     *                未登录的提示信息
     * @return 返回购物车界面或者订单详情页面
     */
    @RequestMapping("/shopping")
    public String shopping(Model model,String[] checked,Integer[] count,HttpServletRequest request){
        HttpSession session = request.getSession();
        //判断用户是否登录,只有登录的用户才能进入付款页面
        User user = (User)session.getAttribute("user");
        List<Category> categoryList = cartService.getCategoryList();
        model.addAttribute("categoryList",categoryList);
        if(user==null){//用户未登录,提示用户登录,返回购物车页面
            request.setAttribute("login","请先登录");
            return "cart";
        }else{//用户已登录,但为选中商品,仍然不能进入付款页面,返回购物车页面
            if(checked==null){
                request.setAttribute("login","请至少选择一件商品");
                return "cart";
            }
            //用户已登录,并且选择了商品
            Cart cart = (Cart)session.getAttribute("cart");
            //从购物车中去除已选中的商品生成订单
            List<CartItem> shop = cartService.shop(checked,count,cart);
            //计算已选中的商品的总价
            Double total = cartService.getTotal(shop);
            //生成订单后返回订单号,并根据订单号和商品生成订单项
            Integer oid = cartService.dealShop(shop,user.getUid());
            model.addAttribute("oid",oid);
            model.addAttribute("shop",shop);
            model.addAttribute("total",total);
            //此时的订单属于提交未完成状态
            return "shopping";
        }
    }

    /**
     * 购物车页面购物项数量点击+时触发ajax,根据传入的pid在购物车对象中查找到
     * 购物项,并将该购物项的商品数量加1
     * @param pid 要添加数量的购物项商品的pid
     * @param request 获得HttpSession对象,继而获得购物车cart对象
     */
    @RequestMapping("add")
    public void add(String pid,HttpServletRequest request){
        HttpSession session = request.getSession();
        Cart cart = (Cart)session.getAttribute("cart");
        LinkedList<CartItem> cartItems = cart.getCartItems();
        //遍历购物项,找到需要将数量加1的购物项,数量加1
        for (int i = 0; i < cartItems.size(); i++) {
            if(cartItems.get(i).getProduct().getPid().equals(Integer.valueOf(pid))){
                cartItems.get(i).setCount(cartItems.get(i).getCount()+1);
                break;
            }
        }
    }

    /**
     *购物车页面购物项数量点击-时触发ajax,根据传入的pid在购物车对象中查找到
     * 购物项,并将该购物项的商品数量减1
     * @param pid 要减少数量的购物项的商品的pid
     * @param request 获得HttpSession对象,继而获得购物车cart对象
     */
    @RequestMapping("/dec")
    public void dec(String pid,HttpServletRequest request){
        HttpSession session = request.getSession();
        Cart cart = (Cart)session.getAttribute("cart");
        LinkedList<CartItem> cartItems = cart.getCartItems();
        //遍历购物项,找到需要将数量减1的购物项,数量减1
        for (int i = 0; i < cartItems.size(); i++) {
            if(cartItems.get(i).getProduct().getPid().equals(Integer.valueOf(pid))){
                cartItems.get(i).setCount(cartItems.get(i).getCount()-1);
                break;
            }
        }
    }

    /**
     * 由前台页修改购买的商品的数量触发
     * @param pid
     * @param count
     * @param request
     */
    @RequestMapping("/changeCount")
    public void changeCount(String pid,String count,HttpServletRequest request){
        HttpSession session = request.getSession();
        Cart cart = (Cart)session.getAttribute("cart");
        LinkedList<CartItem> cartItems = cart.getCartItems();
        //遍历购物项,找到需要改变数量的购物项,改变数量
        for (int i = 0; i < cartItems.size(); i++) {
            if(cartItems.get(i).getProduct().getPid().equals(Integer.valueOf(pid))){
                cartItems.get(i).setCount(Integer.valueOf(count));
                break;
            }
        }
    }

}
