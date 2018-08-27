package org.heida.util;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//表示作用在方法上
@Target({ElementType.METHOD})
//表示运行时有效
@Retention(RetentionPolicy.RUNTIME)
public @interface UserLogin {
    String url() default "";
}
