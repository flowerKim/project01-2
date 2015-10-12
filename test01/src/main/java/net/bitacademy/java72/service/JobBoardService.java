package net.bitacademy.java72.service;

import java.util.List;

import net.bitacademy.java72.domain.JobBoard;

public interface JobBoardService {
  List<JobBoard> list(int pageNo, int pageSize); 
  int insert(JobBoard jobBoard);
  int update(JobBoard jobBoard);
  int delete(int no);
  JobBoard get(int no);
  JobBoard getView(int no);
  int updateView(JobBoard jobBoard);
  int countAll();
//  void views(Board board);
  
}
