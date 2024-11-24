package com.spring.be_booktours.validators;

import java.util.Date;

import com.spring.be_booktours.annotations.FutureOrPresentDate;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FutureOrPresentDateValidator implements ConstraintValidator<FutureOrPresentDate, Date> {
    @Override
    public boolean isValid(Date date, ConstraintValidatorContext context) {
        if (date == null) {
            return true;
        }
        Date now = new Date();
        return !date.before(now);
    }
}