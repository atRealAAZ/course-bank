def gen_result_dict(**kwargs):
    return kwargs

def db_query(
    db_model, db_col, search_term
):
    filters = {db_col: search_term}
    query = (
        db_model
        .query
        .filter_by(**filters)
        .first()
    )
    if query == None:
        return False, query
    else: 
        return True, query