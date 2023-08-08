import { memo, useEffect, useState } from "react";
import { CastPerson } from "../../store/slice/movies";
import ReactPaginate from "react-paginate";
import styles from "../../styles/ActorList/ActorList.module.scss";
import Input from "../Input";
import noPhoto from "../../img/nophoto.png";
import { useNavigate } from "react-router-dom";
import Load from "../../pages/Load";
interface ActorsListProps {
  list?: CastPerson[];
}

const ActorsList = memo((props: ActorsListProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const list = { props };
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState([
    { id: 0, name: "", character: "", profile_path: "" },
  ]);
  const itemsPerPage = 25;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(list!.props!.list!.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list!.props!.list!.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, list.props.list]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * itemsPerPage) % list!.props!.list!.length;
    setItemOffset(newOffset);
  };
  if (!list.props.list) {
    return <Load />;
  }
  return (
    <section className={styles.container}>
      <div className={styles.params}>
        <h3 className={styles.actorsTitle}>Top Billed Casts</h3>
        <Input onChange={setSearchValue} placeholder="Введите имя" />
      </div>
      <>
        <div className={styles.items}>
          {searchValue.length > 2 ? (
            list.props.list

              .filter((el) => {
                return el.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              })
              .map((el) => (
                <div key={el.id} className={styles.card}>
                  <img
                    onClick={() => navigate(`/actor/${el.id}`)}
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
                    onClick={() => navigate(`/actor/${el.id}`)}
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
        <div className={styles.wrapperPagination}>
          <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
          />
        </div>
      </>
    </section>
  );
});

export default ActorsList;
