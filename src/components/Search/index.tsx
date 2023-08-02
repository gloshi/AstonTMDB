import React, { useCallback, useState } from "react";

import styles from "../../styles/Search/Search.module.scss";
import Button, { ButtonSize, ThemeButtonChanger } from "../Button";
import Input from "../Input";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setSearchValue } from "../../store/slice/search";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../approutes/RoutesConfig";
const Search: React.FC = () => {
  const searchValue = useAppSelector((state) => state.search.value);
  const dispatch = useAppDispatch();
  const onClickCancel = () => {
    dispatch(setSearchValue(""));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Link to={AppRoutes.SEARCH}>
        <Button
          disabled={searchValue.length < 1}
          theme={ThemeButtonChanger.CLEAR}
        >
          <BsSearch size={40} className={styles.Icon} />
        </Button>
        </Link>
        <Input
          onChange={(e) => dispatch(setSearchValue(e))}
          value={searchValue}
        />
        {searchValue.length > 0 ? (
          <Button
            onClick={onClickCancel}
            theme={ThemeButtonChanger.OUTLINE_CANCEL}
            size={ButtonSize.XL}
          >
            X
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
