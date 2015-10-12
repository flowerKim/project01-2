package net.bitacademy.java72.service;

import java.util.List;

import net.bitacademy.java72.domain.ReportBoard;



public interface ReportBoardService {
  List<ReportBoard> list(int pageNo, int pageSize); 
  int insert(ReportBoard reportBoard);
  int update(ReportBoard reportBoard);
  int delete(int no);
  ReportBoard get(int no);
  ReportBoard getView(int no);
  int updateView(ReportBoard reportBoard);
  int countAll();
//  void views(Board board);
  
}
