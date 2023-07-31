import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "../../styles/ActorList/ActorList.module.scss";
import noPhoto from "../../img/nophoto.png";
import { CastPerson } from "../../store/slice/movies/types";





export function PaginatedItems() {
  // const [itemOffset, setItemOffset] = useState(0);
  // const [pageCount, setPageCount] = useState(0);
  // const [currentItems, setCurrentItems] = useState([
  //   { id: 0, name: "alex", character: "1", profile_path: "11" },
  // ]);
  // const itemsPerPage = 25;
  //
  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(data.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(data.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, data]);

  // const handlePageClick = (event: { selected: number }) => {
  //   const newOffset = (event.selected * itemsPerPage) % data.length;
  //   setItemOffset(newOffset);
  // };
  // if (currentItems.length === 0 || data.length === 0) {
  //   return <div>load...</div>;
  // }
  return (
    <>
      {/* <div className={styles.items}>
        {searchValue.length > 1 ? (
          data
            .filter((el: string | any[]) => {
              //@ts-ignore
              return el.name.toLowerCase().includes(searchValue.toLowerCase());
              //@ts-ignore
            })
            .map((el:any) => (
              <div key={el.id} className={styles.card}>
                <img
                  src={
                    el.profile_path
                      ? `https://image.tmdb.org/t/p/original/${el.profile_path}`
                      : noPhoto
                  }
                  alt={el.name}
                />
                <h4 className={styles.name}>{el.name}</h4>
                <p className={styles.character}>{el.character}</p>
              </div>
            ))
        ) : (
          <>
            {currentItems!.map((el) => (
              <div key={el.id} className={styles.card}>
                <img
                  src={
                    el.profile_path
                      ? `https://image.tmdb.org/t/p/original/${el.profile_path}`
                      : noPhoto
                  }
                  alt={el.name}
                />
                <h4 className={styles.name}>{el.name}</h4>
                <p className={styles.character}>{el.character}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
      /> */}
    </>
  );
}
