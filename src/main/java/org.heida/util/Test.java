package org.heida.util;

public class Test {
    public static void main(String[] args) {
        String email = "2411757336@qq.com";
        String mobiles = "15390729675";
        String code = "342400";
        System.out.println(Util.checkEmail(email));
        System.out.println(Util.isMobilNumber(mobiles));
        System.out.println(Util.isCode(code));
    }
}
