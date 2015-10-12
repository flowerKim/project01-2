package net.bitacademy.java72.service;

import java.util.List;

import net.bitacademy.java72.domain.Notice;

public interface NoticeService {
  List<Notice> list(int noticePageNo, int noticePageSize); 
  int countAll();
  int insert(Notice notice);
  int update(Notice notice);
  int delete(int nno);
  Notice get(int nno);
//  Notice getView(int nno);
//  int updateView(Notice notice);
  
}
