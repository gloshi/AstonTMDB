import React, { useCallback, useState } from "react";

import styles from "../../styles/Search/Search.module.scss";
import Button, { ButtonSize, ThemeButtonChanger } from "../Button";
import Input from "../Input";
import {BsSearch} from 'react-icons/bs'
const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const onClickCancel = () => {
    setSearchValue("");
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.box}>
      <BsSearch size={40} className={styles.Icon} />
      <Input onChange={setSearchValue} value={searchValue} />
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
