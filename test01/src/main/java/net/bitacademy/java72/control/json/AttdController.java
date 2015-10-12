package net.bitacademy.java72.control.json;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.bitacademy.java72.domain.Attd;
import net.bitacademy.java72.service.AttdService;

@Controller("json.AttdController")
@RequestMapping("/bitin/attd")
public class AttdController {
  @Autowired AttdService attdService;
  @Autowired ServletContext servletContext;
  
  @RequestMapping("/list")
  public Object list(Attd attd) {
    Map<String,Object> result = new HashMap<String,Object>();
    result.put("data", attdService.list(attd.getToday()));
    
    return result;
  }
  
  @RequestMapping("/attdInfo")
  public Object detail(int memNo) {
    Map<String,Object> result = new HashMap<String,Object>();
    result.put("data", attdService.get(memNo));
    
    return result;
  }
  
  @RequestMapping("/dayInfo")
  public Object dayInfo() {
    Map<String,Object> result = new HashMap<String,Object>();
    result.put("data", attdService.getToday());
    System.out.println(result.get("data"));
    
    return result;
  }
  
//  @RequestMapping("/attdPercent")
//  public Object attdPercent(int memNo) {
//    Map<String,Object> result = new HashMap<String,Object>();
//    result.put("data", attdService.getCheck(memNo));
//    
//    return result;
//  
//  }
  
}





