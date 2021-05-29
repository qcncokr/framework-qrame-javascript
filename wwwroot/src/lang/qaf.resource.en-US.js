/// <summary>
/// 다국어 처리를 위한 문자열 리소스를 '영어권' 언어에 맞게 변경합니다.
/// </summary>
(function ($res) {
    if (!$res) {
        throw new Error('There are no $res resource objects.');
    }
    $res.add('localeID', 'en-US');

    $res.add('progress', 'In progress.');
    $res.add('append', 'New input status.');
    $res.add('appendPre', 'In the screen structure.');
    $res.add('retrieve', 'It was normally inquired.');
    $res.add('retrieveException', 'A problem generated data by the inquired process.');
    $res.add('retrievePre', 'During data inquiry.');
    $res.add('save', 'It was normally preserved.');
    $res.add('saveException', 'A problem generated data by the preserved process.');
    $res.add('savePre', 'It\'s being preserved.');
    $res.add('update', 'It was normally corrected.');
    $res.add('updateException', 'A problem generated data by the corrected process.');
    $res.add('updatePre', 'It\'s being corrected.');
    $res.add('remove', 'It was normally eliminated.');
    $res.add('removeException', 'A problem generated data by the eliminated process.');
    $res.add('removePre', 'It\'s eliminated.');
    $res.add('copyAppend', 'Existence data was copied and it was changed by input status.');
    $res.add('userInfoNothing', 'A problem occurred to user information.');

    $res.add('isLogOut', 'Do you log out really?');
    $res.add('waiting', 'Please wait only a moment...');
    $res.add('notElemnet', 'Control wasn\'t found. Please check a query and the HyperText Markup Language design.');
    $res.add('dualElemnet', 'The ID for "{0}" was found by control of the name I overlapped by the present page or the ID.');
    $res.add('requiredKeyData', 'Indispensable input item slip');
    $res.add('requiredInsertData', 'The lower item is an indispensable input item.');
    $res.add('errorMessage', 'An error occurred.');
    $res.add('serverErrorMessage', 'An error occurred by a server.');
    $res.add('initialComplete', 'Screen structure completion');
    $res.add('initialException', 'Screen structure failure');
    $res.add('isDateTimeInsert', '"{0}" it has to input a day of the format and time.');
    $res.add('isDateInsert', '"{0}" it has to input a day of the format.');
    $res.add('isTimeInsert', '"{0}" it has to input time of the format.');
    $res.add('isNumericInsert', 'It has to input a number.');
    $res.add('forceSave', 'Is the data which is being edited preserved?');
    $res.add('textMaxLength', 'The number of digits of "{0}" that can be entered has been exceeded. In English, other characters with one digit are calculated by two digits.');

    $res.add('create', 'input');
    $res.add('read', 'inquiry');
    $res.add('find', 'search');
    $res.add('update', 'correction');
    $res.add('delele', 'elimination');
    $res.add('removeStatusNo', 'elimination isn\'t in the possible state. After inquiring data, I have to eliminate. ');
    $res.add('removeConfirm', 'Is it eliminated in truth?');
    $res.add('notData', 'there is no data. ');
    $res.add('notCondData', 'there is no data which matches the input condition. ');
    $res.add('notRetrieveCond', 'the item necessary to inquiry wasn\'t input. ');
    $res.add('notDateBetween', 'it isn\'t possible to happen to starting sunshades of the complete weather of "{0}" "{1}" recently. ');
    $res.add('notDate', 'a correct day is input, and I have to choose. ');
    $res.add('notFindCond', 'it has to input sentences necessary to a search. It has to input more than two letter for a correct search. ');
    $res.add('selectData', 'I have to choose data.');
    $res.add('selectAll', 'whole');
    $res.add('saveExcel', 'Excel It\'s during download.');
    $res.add('saveExcelComplete', 'Excel  A file was downloaded.');
    $res.add('saveExcelFail', 'Excel  File  I failed in download.');
    $res.add('notSupportContent', 'the contents-type which aren\'t supported.');
    $res.add('notLoginID', '로그인ID는 반드시 입력해야 합니다.');
    $res.add('notPassword', '비밀번호는 반드시 입력해야 합니다.');
    $res.add('notLogin', '아이디 또는 비밀번호가 잘못되었습니다.');
    $res.add('loginLockedOut', '로그인 인증이 지정된 횟수 이상 잘못 되어, "{0}" 계정을 잠김 상태로 변경되었습니다. 담당자에게 문의하세요.');
    $res.add('alreadyLogged', '입력 하신 계정은 이미 로그인 되어 있습니다. 계속 진행하시면 기존 로그인 계정은 로그아웃됩니다. 계속하시겠습니까?');
})(globalThis.$res || qaf.$resource);