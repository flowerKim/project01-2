package net.bitacademy.java72.dao;

import java.util.List;
import java.util.Map;
import net.bitacademy.java72.domain.JobBoard;

public interface JobBoardDao {
  List<JobBoard> list(Map<String, Object> paramMap); 
  int insert(JobBoard JobBoard);
  int update(JobBoard JobBoard);
  int delete(int no);
  JobBoard get(int no);
  JobBoard getView(int no);
  int updateView(JobBoard jobBoard);
  int countAll();

  /*
   * 1. BoardDao.xml에 선언된 네임스페이스 이름과 인터페이스 이름을 같게 한다.
   *  <mapper namespace="net.bitacademy.java72.dao.BoardDao">
   *  이것과 지금 이 파일의 패키지명+클래스명이 위의 네임 스페이스와 같아야 함.
   * 2.SQL 아이디의 이름과 인터페이스 메소드 이름을 같게 한다.
   */
  

  

  
}
