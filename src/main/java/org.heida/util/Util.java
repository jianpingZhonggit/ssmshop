package org.heida.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Util {
    public static boolean checkEmail(String email){
        String ruleEmail = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$";
        //正则表达式的模式
        Pattern pattern = Pattern.compile(ruleEmail);
        //正则表达式的匹配器
        Matcher matcher = pattern.matcher(email);
        //进行正则匹配
        return matcher.matches();
    }

    public static boolean isMobilNumber(String mobiles){
        Pattern pattern = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");
        Matcher matcher = pattern.matcher(mobiles);
        return matcher.matches();
    }

    public static boolean isCode(String code){
        Pattern pattern = Pattern.compile("\\d{6}");
        Matcher matcher = pattern.matcher(code);
        return matcher.matches();

    }

}
