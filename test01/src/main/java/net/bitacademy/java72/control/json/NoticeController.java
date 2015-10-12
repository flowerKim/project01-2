package net.bitacademy.java72.control.json;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import net.bitacademy.java72.domain.Notice;
import net.bitacademy.java72.service.NoticeService;

@Controller("json.NoticeController")
@RequestMapping("/bitin/notice")
public class NoticeController {
  @Autowired NoticeService noticeService;
  @Autowired ServletContext servletContext;
  
  @RequestMapping("/list.do")
  public Object list(  
      @RequestParam(required=false, defaultValue="1") int noticePageNo, 
      @RequestParam(required=false, defaultValue="3") int noticePageSize
      ) {
     
    // <String>여기 담긴 값을 직접 클라이언트로 보내라
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("noticePageNo", noticePageNo);

    // 페이징 처리
    int noticeTotalCount = noticeService.countAll();
    int noticeLastPageNo = noticeTotalCount / noticePageSize;
    if ((noticeTotalCount % noticePageSize) > 0) {
      noticeLastPageNo++;
    }
    
    if (noticePageNo < noticeLastPageNo) { // 다음 페이지가 있다면
      result.put("isNoticeNextPage", true);
    } else {
      result.put("isNoticeNextPage", false);
    }
    // 페이징 처리 끝.
   
    result.put("noticePageSize", noticePageSize);
    result.put("data", noticeService.list(noticePageNo, noticePageSize));
    
    return result;
    
  }
  @RequestMapping("/delete.do")
  public Object delete(int nno) {
    int count = noticeService.delete(nno); 
    // count에 들어가는 값은 삭제한 개수가 자동으로 들어감
    Map<String, Object> result = new HashMap<String, Object>();
    
    if (count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }

  @RequestMapping("detail.do")
  public Object detail(int nno, Notice notice) {
    Map<String, Object> result = new HashMap<String, Object>();
//    게시물 조회수
//    notice = noticeService.getView(nno);
//    int tempView = notice.getViewCount() + 1;
//    notice.setViewCount(tempView);
//    noticeService.updateView(notice);
//    notice = noticeService.get(nno);
    
//     Web View로 [데이터를 전달해야 할 경우] 이 타입의 argument를 정의하고
//     메소드 내부에서 View로 전달할 데이터를 추가해야 한다.
//    int view = notice.getViewCount() + 1;
//    notice.setViewCount(view);
//    noticeService.views(notice);
    result.put("data", noticeService.get(nno));

    return result;
  }
  
//  @RequestMapping("/insert.do")
//  public Object insert(Notice notice,
//      @RequestParam(required=false) MultipartFile file1) {
//    Map<String, Object> result = new HashMap<String, Object>();
//    //파일업로드 
////    String filename = MultipartUtils.getFilename(file1.getOriginalFilename());
////    File newPath = new File(servletContext.getRealPath("/files")
////        + "/" + filename);
////    file1.transferTo(newPath);
////    notice.setAttachFile1(filename);
//    
//    int count = noticeService.insert(notice);
//    if (count > 0) {
//      result.put("data", "success");
//    } else {
//      result.put("data", "fail");
//    }
//    
//    return result;
//  }
  
  
//  @RequestMapping("/update.do")
//  public Object update(Notice notice, 
//      @RequestParam(required=false) MultipartFile file1) {
//    Map<String, Object> result = new HashMap<String, Object>();
//    
//    String filename = MultipartUtils.getFilename(file1.getOriginalFilename());
//    File newPath = new File(servletContext.getRealPath("/files") + "/" + filename);
//    file1.transferTo(newPath);
//    
//    String tempFileName = notice.getAttachFile1();
//    notice.setAttachFile1(filename);
//    
//    int count = noticeService.update(notice); 
//    if (count > 0) {
//      result.put("data", "success");
//    } else {
//      result.put("data", "fail");
//    }
//    return result;
//  }
  
}
