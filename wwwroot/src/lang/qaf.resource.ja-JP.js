/// <summary>
/// 다국어 처리를 위한 문자열 리소스를 '일본어권' 언어에 맞게 변경합니다.
/// </summary>
(function ($res) {
    if (!$res) {
        throw new Error('$resリソース客体がありません。');
    }
    $res.add('localeID', 'ja-JP');

    $res.add('progress', '進行中です。');
    $res.add('append', '新規入力状態です。');
    $res.add('appendPre', '画面構成中...');
    $res.add('retrieve', '正常に照会されました。');
    $res.add('retrieveException', 'データを問い合わせる過程で問題が発生しました。');
    $res.add('retrievePre', 'データ照会中...');
    $res.add('save', '正常に保存されました。');
    $res.add('saveException', 'データを保存する過程で問題が発生しました。');
    $res.add('savePre', '保存中...');
    $res.add('update', '正常に修正されました。');
    $res.add('updateException', 'データを修正する過程で問題が発生しました。');
    $res.add('updatePre', '修正中...');
    $res.add('remove', '正常に削除されました。');
    $res.add('removeException', 'データを削除する過程で問題が発生しました。');
    $res.add('removePre', '削除中...');
    $res.add('copyAppend', '既存データをコピーして入力状態で切り替えました。');
    $res.add('userInfoNothing', '使用者情報に問題が発生しました。');

    $res.add('isLogOut', '本当にログ アウトしますか?');
    $res.add('waiting', '少しの間だけ待って下さい。。。');
    $res.add('notElemnet', 'コントロールが発見されなかったです。 クエリーやHTMLデザインを調べて下さい。');
    $res.add('dualElemnet', '"{0}"のIDは現在のページで重複した名前または、IDのコントロールで発見されました。');
    $res.add('requiredKeyData', '必須入力項目誤り');
    $res.add('requiredInsertData', '下項目は必須入力項目です。');
    $res.add('errorMessage', 'エラーが発生しました。');
    $res.add('serverErrorMessage', 'サーバーでエラーが発生しました。');
    $res.add('initialComplete', '画面構成完了');
    $res.add('initialException', '画面構成失敗');
    $res.add('isDateTimeInsert', '"{0}"フォーマットの日と時間を入力しなければなりません。');
    $res.add('isDateInsert', '"{0}"フォーマットの日を入力しなければなりません。');
    $res.add('isTimeInsert', '"{0}"フォーマットの時間を入力しなければなりません。');
    $res.add('isNumericInsert', '数字を入力しなければなりません。');
    $res.add('forceSave', '編集中のデータを保存しますか?');
    $res.add('textMaxLength', '入力可能な "{0}"の桁数を超えました。英語は1桁の他の文字は、2桁のずつ計算されます。');

    $res.add('create', '入力');
    $res.add('read', '照会');
    $res.add('find', '検索');
    $res.add('edit', '修正');
    $res.add('delele', '削除');
    $res.add('removeStatusNo', '削除可能な状態ではありません。 データを問い合わせた後削除しなければなりません。');
    $res.add('removeConfirm', '本当に削除しますか?');
    $res.add('notData', 'データがありません。');
    $res.add('notCondData', '入力された条件に合うデータがありません。');
    $res.add('notRetrieveCond', '照会に必要な項目が入力されなかったです。');
    $res.add('notDateBetween', '"{0}"の完了日より"{1}"の開始日がさらに最近起こることができません。');
    $res.add('notDate', '正確な日を入力したり選択しなければなりません。');
    $res.add('notFindCond', '検索に必要な文章を入力しなければなりません。 正確な検索のために二字以上入力しなければなりません。');
    $res.add('selectData', 'データを選択しなければなりません。');
    $res.add('selectAll', '全体');
    $res.add('saveExcel', 'エクセル ダウンロード中です。');
    $res.add('saveExcelComplete', 'エクセル ファイルをダウンロードしました。');
    $res.add('saveExcelFail', 'エクセル ファイル ダウンロードを失敗しました');
    $res.add('notSupportContent', '支援しないコンテンツ タイプです。');
    $res.add('notLoginID', '로그인ID는 반드시 입력해야 합니다.');
    $res.add('notPassword', '비밀번호는 반드시 입력해야 합니다.');
    $res.add('notLogin', '아이디 또는 비밀번호가 잘못되었습니다.');
    $res.add('loginLockedOut', '로그인 인증이 지정된 횟수 이상 잘못 되어, "{0}" 계정을 잠김 상태로 변경되었습니다. 담당자에게 문의하세요.');
    $res.add('alreadyLogged', '입력 하신 계정은 이미 로그인 되어 있습니다. 계속 진행하시면 기존 로그인 계정은 로그아웃됩니다. 계속하시겠습니까?');
})(globalThis.$res || qaf.$resource);