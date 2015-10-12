package net.bitacademy.java72.control.json;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.bitacademy.java72.domain.ReportBoard;
import net.bitacademy.java72.service.ReportBoardService;

@Controller("json.ReportBoardController")
@RequestMapping("/bitin/reportBoard")
public class ReportBoardController {
  @Autowired ReportBoardService reportBoardService;
  @Autowired ServletContext servletContext;

  
  @RequestMapping("/delete")
  public Object delete(int no) {
    int count = reportBoardService.delete(no);

    Map<String,Object> result = 
        new HashMap<String,Object>();
    if (count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "failure");
    }
    
    return result;
  }
  
  @RequestMapping("/detail")
  public Object detail(int no) {
    Map<String,Object> result = 
        new HashMap<String,Object>();
    result.put("data", reportBoardService.get(no));
    
    return result;
  }

  @RequestMapping("/insert")
  public Object insert(ReportBoard reportBoard) throws Exception {
      int count = reportBoardService.insert(reportBoard);
      
      Map<String,Object> result = 
          new HashMap<String,Object>();
      if (count > 0) {
        result.put("data", "success");
      } else {
        result.put("data", "failure");
      }
      
      return result;
  }
  
  @RequestMapping("/list")
  public Object list(
      @RequestParam(required=false, defaultValue="1") 
      int pageNo,
      @RequestParam(required=false, defaultValue="3")
      int pageSize) {
    
    Map<String,Object> result = 
        new HashMap<String,Object>();
    
    result.put("pageNo", pageNo);
    
    int totalCount = reportBoardService.countAll();
    int lastPageNo = totalCount / pageSize;
    if ((totalCount % pageSize)  > 0) {
      lastPageNo++;
    }
    
    if (pageNo < lastPageNo) { // 다음 페이지가 있다면
      result.put("isNextPage", true);
    } else {
      result.put("isNextPage", false);
    }
    
    result.put("pageSize", pageSize);
    
    result.put("data", 
        reportBoardService.list(pageNo, pageSize));
    
    return result;
  }
  
  
  
  
  
  @RequestMapping("/update")
  public Object update (ReportBoard reportBoard) throws Exception {

    int count = reportBoardService.update(reportBoard);

    Map<String,Object> result = 
        new HashMap<String,Object>();
    if (count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "failure");
    }
    
    return result;
  }
}





