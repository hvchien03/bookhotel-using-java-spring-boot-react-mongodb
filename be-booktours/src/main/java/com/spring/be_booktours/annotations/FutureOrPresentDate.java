package com.spring.be_booktours.annotations;
import java.lang.annotation.*;

import com.spring.be_booktours.validators.FutureOrPresentDateValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = FutureOrPresentDateValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface FutureOrPresentDate {
    String message() default "Bạn phải chọn ngày nhận phòng trước 1 ngày so với ngày hiện tại";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}